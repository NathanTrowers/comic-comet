package com.comiccomet.shootingstar.dto;

public class MailObject {
    private String subject;
    private String text;

    public MailObject() {}
    
    public MailObject(String subject, String text) {
        this.subject = subject;
        this.text = text;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return "MailObject [subject=" + subject + ", text=" + text + "]";
    }
}
