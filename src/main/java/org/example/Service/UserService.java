package org.example.Service;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.example.Bean.User;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.util.Objects;
import java.util.concurrent.ExecutionException;
@Service
public class UserService {
    public static final String COL_NAME="users";

    public String saveUserDetails(User user, String name) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        System.out.println(name);
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(name).set(user);

        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public User getUserDetails(String name) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(name);
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        User user = new User();

        if(document.exists()) {
            System.out.println(document.getId());

            user = document.toObject(User.class);
            user.setAge(Integer.parseInt(Objects.requireNonNull(document.get("age")).toString()));
            user.setName(Objects.requireNonNull(document.get("name")).toString());
            user.setPw(Objects.requireNonNull(document.get("pw")).toString());


            return user;
        }else {
            System.out.println("not working");
            return null;
        }
    }

    public String updateUserDetails(User person, String name) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        System.out.println(name + person.getName());
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(name).set(person);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String deleteUser(String name) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COL_NAME).document(name).delete();
        return "Document with User ID "+name+" has been deleted";
    }
}
