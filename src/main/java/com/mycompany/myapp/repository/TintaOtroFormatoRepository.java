package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.TintaOtroFormato;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TintaOtroFormato entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TintaOtroFormatoRepository extends JpaRepository<TintaOtroFormato, Long>, JpaSpecificationExecutor<TintaOtroFormato> {

}
