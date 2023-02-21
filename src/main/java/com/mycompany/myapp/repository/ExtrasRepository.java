package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Extras;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Extras entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExtrasRepository extends JpaRepository<Extras, Long> {

}
