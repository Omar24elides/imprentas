package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Portada;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Portada entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PortadaRepository extends JpaRepository<Portada, Long> {

}
