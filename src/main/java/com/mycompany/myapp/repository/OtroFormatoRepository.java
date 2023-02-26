package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.OtroFormato;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OtroFormato entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OtroFormatoRepository extends JpaRepository<OtroFormato, Long> {

}
