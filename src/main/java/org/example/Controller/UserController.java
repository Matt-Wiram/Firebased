package org.example.Controller;



import jakarta.servlet.http.HttpSession;
import org.apache.http.protocol.HTTP;
import org.example.Bean.User;
import org.example.Service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.concurrent.ExecutionException;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/getUserDetails")
    public ModelAndView getUser(@RequestParam String name, HttpSession session, @RequestParam("password") String pw) throws InterruptedException, ExecutionException{
        System.out.println(pw);

        User user = userService.getUserDetails(name);
        if (user.getPw().equals(pw)) {
            session.setAttribute("user", user);
            session.setAttribute("name", name);
            return new ModelAndView("redirect:/profile");
        }
       else {
           return new ModelAndView("redirect:/login");
        }
    }
    @GetMapping("/createUser")
    public String create(Model model, @RequestParam("named") String name) {
        model.addAttribute("users", new User());
        return "register";
    }

    @PostMapping("/createUser")
    public ModelAndView createUser( User user, @RequestParam("named") String name ) throws InterruptedException, ExecutionException {
        userService.saveUserDetails(user, name);
        return new ModelAndView("redirect:/login");
    }

    @PostMapping("/updateUser")
    public ModelAndView updatePatient( User user, @RequestParam("named") String name, HttpSession session  ) throws InterruptedException, ExecutionException {
        if (session.getAttribute("name").equals(name)) {
            userService.updateUserDetails(user, name);
        }
        else {
            userService.deleteUser((String)session.getAttribute("name"));
            userService.updateUserDetails(user, name);
        }
        return new ModelAndView("redirect:/login");
    }

    @PostMapping("/deleteUser")
    public ModelAndView deleteUser(@RequestParam String name){

                userService.deleteUser(name);
                return new ModelAndView("redirect:/login");
    }




}
