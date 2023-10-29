package org.example.Controller;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.internal.NonNull;
import jakarta.servlet.http.HttpSession;
import org.example.Bean.User;
import org.example.Service.UserService;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;
@Controller
public class UsersController {
    @Autowired
    UserService userService;
    @GetMapping("/login")
    public String login() {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference collectionReference = dbFirestore.collection("users");
        // asynchronously retrieve all documents
        ApiFuture<QuerySnapshot> future = collectionReference.get();
// future.get() blocks on response
        List<QueryDocumentSnapshot> documents = null;
        try {
            documents = future.get().getDocuments();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
        for (QueryDocumentSnapshot document : documents) {
            System.out.println(document.getId() + " => " + document.toObject(User.class).getName());
            System.out.println(document.toObject(User.class).getPw());
            System.out.println(document.toObject(User.class).getAge());

        }

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
    public String update(Model model, HttpSession session) {
        model.addAttribute("user", session.getAttribute("user"));
        model.addAttribute("name", session.getAttribute("name"));
        return "updateUser";
    }

    @GetMapping("/profile")
    public String profile(Model model, HttpSession session) {
        User user = (User) session.getAttribute("user");
        model.addAttribute(user);
        return "profile";
    }
}
