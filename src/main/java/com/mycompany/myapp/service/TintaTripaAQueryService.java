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

import com.mycompany.myapp.domain.TintaTripaA;
import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.repository.TintaTripaARepository;
import com.mycompany.myapp.service.dto.TintaTripaACriteria;

/**
 * Service for executing complex queries for {@link TintaTripaA} entities in the database.
 * The main input is a {@link TintaTripaACriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TintaTripaA} or a {@link Page} of {@link TintaTripaA} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TintaTripaAQueryService extends QueryService<TintaTripaA> {

    private final Logger log = LoggerFactory.getLogger(TintaTripaAQueryService.class);

    private final TintaTripaARepository tintaTripaARepository;

    public TintaTripaAQueryService(TintaTripaARepository tintaTripaARepository) {
        this.tintaTripaARepository = tintaTripaARepository;
    }

    /**
     * Return a {@link List} of {@link TintaTripaA} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TintaTripaA> findByCriteria(TintaTripaACriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TintaTripaA> specification = createSpecification(criteria);
        return tintaTripaARepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link TintaTripaA} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TintaTripaA> findByCriteria(TintaTripaACriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TintaTripaA> specification = createSpecification(criteria);
        return tintaTripaARepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TintaTripaACriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TintaTripaA> specification = createSpecification(criteria);
        return tintaTripaARepository.count(specification);
    }

    /**
     * Function to convert {@link TintaTripaACriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TintaTripaA> createSpecification(TintaTripaACriteria criteria) {
        Specification<TintaTripaA> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), TintaTripaA_.id));
            }
            if (criteria.getTintaId() != null) {
                specification = specification.and(buildSpecification(criteria.getTintaId(),
                    root -> root.join(TintaTripaA_.tinta, JoinType.LEFT).get(Tinta_.id)));
            }
            if (criteria.getTripaAId() != null) {
                specification = specification.and(buildSpecification(criteria.getTripaAId(),
                    root -> root.join(TintaTripaA_.tripaA, JoinType.LEFT).get(TripaA_.id)));
            }
        }
        return specification;
    }
}
