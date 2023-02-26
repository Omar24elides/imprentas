package com.mycompany.myapp.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.mycompany.myapp.domain.TintaTripaB;
import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.repository.TintaTripaBRepository;
import com.mycompany.myapp.service.dto.TintaTripaBCriteria;

/**
 * Service for executing complex queries for {@link TintaTripaB} entities in the database.
 * The main input is a {@link TintaTripaBCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TintaTripaB} or a {@link Page} of {@link TintaTripaB} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TintaTripaBQueryService extends QueryService<TintaTripaB> {

    private final Logger log = LoggerFactory.getLogger(TintaTripaBQueryService.class);

    private final TintaTripaBRepository tintaTripaBRepository;

    public TintaTripaBQueryService(TintaTripaBRepository tintaTripaBRepository) {
        this.tintaTripaBRepository = tintaTripaBRepository;
    }

    /**
     * Return a {@link List} of {@link TintaTripaB} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TintaTripaB> findByCriteria(TintaTripaBCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TintaTripaB> specification = createSpecification(criteria);
        return tintaTripaBRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link TintaTripaB} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TintaTripaB> findByCriteria(TintaTripaBCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TintaTripaB> specification = createSpecification(criteria);
        return tintaTripaBRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TintaTripaBCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TintaTripaB> specification = createSpecification(criteria);
        return tintaTripaBRepository.count(specification);
    }

    /**
     * Function to convert {@link TintaTripaBCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TintaTripaB> createSpecification(TintaTripaBCriteria criteria) {
        Specification<TintaTripaB> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), TintaTripaB_.id));
            }
            if (criteria.getTintaId() != null) {
                specification = specification.and(buildSpecification(criteria.getTintaId(),
                    root -> root.join(TintaTripaB_.tinta, JoinType.LEFT).get(Tinta_.id)));
            }
            if (criteria.getTripaBId() != null) {
                specification = specification.and(buildSpecification(criteria.getTripaBId(),
                    root -> root.join(TintaTripaB_.tripaB, JoinType.LEFT).get(TripaB_.id)));
            }
        }
        return specification;
    }
}
