package com.comiccomet.shootingstar.service;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.Resource;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.comiccomet.shootingstar.constant.ErrorCodeConstants;
import com.comiccomet.shootingstar.controller.MailController;
import com.comiccomet.shootingstar.dto.ErrorResponse;
import com.comiccomet.shootingstar.dto.MailObject;
import com.comiccomet.shootingstar.dto.SuccessResponse;
import com.comiccomet.shootingstar.entity.Customer;
import com.comiccomet.shootingstar.exception.SenderNotFoundException;
import com.comiccomet.shootingstar.repository.CustomerRepository;
import com.comiccomet.shootingstar.validator.ValidatorInterface;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
@PropertySource(value={"classpath:application.properties"})
public class EmailService {
    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    @Value("${receiving.address}")
    private String RECEIVING_ADDRESS;
    @Value("${spring.mail.username}")
    private String SENDING_ADDRESS;
    private String ERROR_MESSAGE = "bad request";
    private String SUCCESS_MESSAGE = "accepted";
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private JavaMailSender emailSender;
    @Value("classpath:/mail-logo.png")
    private Resource resourceFile;
    @Autowired
    private SpringTemplateEngine thymeleafTemplateEngine;
    @Autowired
    private ValidatorInterface mailObjectValidator;

    public EmailService(ValidatorInterface mailObjectValidator, CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
        this.mailObjectValidator = mailObjectValidator;
    }

    public ResponseEntity<ErrorResponse> sendIsUnauthorized() {
        log.error("User Authorization failed! Rejecting request.");
        
        int[] errorCodes = {ErrorCodeConstants.ERROR_UNAUTHORIZED_REQUEST};

        return ResponseEntity
            .status(401)
            .body(new ErrorResponse(401, "unauthorized", errorCodes));
    }
    
    public ResponseEntity<?> sendMessage(String customerId, MailObject mailObject) {
        try {
            int[] errorCodes = this.mailObjectValidator.validate(mailObject);
            if (errorCodes.length > 0) {
                log.error("Invalid payload received");

                return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse(400, ERROR_MESSAGE, errorCodes));
            }

            Customer sender = this.customerRepository.findById(customerId)
                .orElseThrow(() -> new SenderNotFoundException());
            String senderName = sender.getName();

            Map<String, Object> templateModel = new HashMap<>();
            templateModel.put("text", mailObject.getText());
            templateModel.put("senderName", senderName);

            Context thymeleafContext = new Context();
            thymeleafContext.setVariables(templateModel);

            String htmlBody = thymeleafTemplateEngine.process("template-thymeleaf.html", thymeleafContext);

            this.sendHtmlMessage(mailObject.getSubject(), htmlBody);
            
            log.info("Email successfully sent on behalf of {}", senderName);
            
            return ResponseEntity
                .accepted()
                .body(EntityModel.of(new SuccessResponse(202, SUCCESS_MESSAGE),
                    linkTo(methodOn(MailController.class).createHtmlMail("exampleInvalidToken", mailObject)).withSelfRel()));
        } catch(SenderNotFoundException senderNotFoundException) {
            log.error("An error occurred prior to sending the email: ", senderNotFoundException);

            return ResponseEntity
                .badRequest()
                .body(new ErrorResponse(400, ERROR_MESSAGE, new int[]{ErrorCodeConstants.ERROR_SENDER_NAME_NOT_FOUND}));
        } catch(Exception exception) {
            log.error("An error occurred while sending the email: ", exception);

            return ResponseEntity
                .badRequest()
                .body(new ErrorResponse(400, ERROR_MESSAGE, new int[]{1}));
        }
    }

    private void sendHtmlMessage(String subject, String htmlBody)  {
        try {
            MimeMessage message = this.emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(this.SENDING_ADDRESS);
            helper.setTo(this.RECEIVING_ADDRESS);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            helper.addInline("attachment.png", this.resourceFile);
            this.emailSender.send(message);
        } catch(MessagingException messagingException) {
            log.error("An error occurred while sending the email: ", messagingException);
        }
    }
}
