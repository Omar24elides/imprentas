package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Maquina;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Maquina entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaquinaRepository extends JpaRepository<Maquina, Long> {

}
