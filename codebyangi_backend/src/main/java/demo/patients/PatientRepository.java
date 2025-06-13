package demo.patients;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The PatientRepository is a public interface that extends JpaRepository to perform CRUD operations on Patient entities.
 * It knows about the Patient class and the type of its primary key (Integer).
 */

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {

}