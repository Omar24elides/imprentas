package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.ManoObra;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ManoObra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ManoObraRepository extends JpaRepository<ManoObra, Long> {

}
