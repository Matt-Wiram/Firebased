package org.example.Bean;


import org.springframework.context.annotation.Bean;

public class User {

   private String name;
   private int age;
   private String pw;

    public User(String name, int age, String pw) {
        this.name = name;
        this.age = age;
        this.pw = pw;
    }

    public User() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }
}
