package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Plancha;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Plancha entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanchaRepository extends JpaRepository<Plancha, Long>, JpaSpecificationExecutor<Plancha> {

}
