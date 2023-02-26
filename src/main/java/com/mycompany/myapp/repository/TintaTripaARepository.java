package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.TintaTripaA;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TintaTripaA entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TintaTripaARepository extends JpaRepository<TintaTripaA, Long>, JpaSpecificationExecutor<TintaTripaA> {

}
