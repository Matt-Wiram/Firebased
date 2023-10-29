package org.example.Controller;

import org.example.Bean.User;
import org.example.Service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;
@Controller
public class UsersController {
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/login")
    public String postLogin() {
        return "redirect:/getUserDetails";
    }

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }
    @GetMapping("/delete")
    public String delete(Model model) {
        return "delete";
    }
    @GetMapping("/update")
    public String update(Model model) {
        model.addAttribute("user", new User());
        return "updateUser";
    }
}
