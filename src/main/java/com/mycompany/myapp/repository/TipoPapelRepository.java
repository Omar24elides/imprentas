package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.TipoPapel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoPapel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoPapelRepository extends JpaRepository<TipoPapel, Long> {

}
