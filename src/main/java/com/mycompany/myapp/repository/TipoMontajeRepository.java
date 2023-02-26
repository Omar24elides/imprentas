package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.TipoMontaje;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoMontaje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoMontajeRepository extends JpaRepository<TipoMontaje, Long> {

}
