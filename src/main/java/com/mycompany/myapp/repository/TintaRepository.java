package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Tinta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Tinta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TintaRepository extends JpaRepository<Tinta, Long> {

}
