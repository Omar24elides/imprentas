package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.TripaB;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TripaB entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TripaBRepository extends JpaRepository<TripaB, Long> {

}
