package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.CostosIndirectos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CostosIndirectos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostosIndirectosRepository extends JpaRepository<CostosIndirectos, Long> {

}
