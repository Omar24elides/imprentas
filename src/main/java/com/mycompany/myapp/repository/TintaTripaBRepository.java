package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.TintaTripaB;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TintaTripaB entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TintaTripaBRepository extends JpaRepository<TintaTripaB, Long>, JpaSpecificationExecutor<TintaTripaB> {

}
