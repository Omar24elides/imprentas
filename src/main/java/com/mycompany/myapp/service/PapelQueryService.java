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

import com.mycompany.myapp.domain.Papel;
import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.repository.PapelRepository;
import com.mycompany.myapp.service.dto.PapelCriteria;

/**
 * Service for executing complex queries for {@link Papel} entities in the database.
 * The main input is a {@link PapelCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Papel} or a {@link Page} of {@link Papel} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class PapelQueryService extends QueryService<Papel> {

    private final Logger log = LoggerFactory.getLogger(PapelQueryService.class);

    private final PapelRepository papelRepository;

    public PapelQueryService(PapelRepository papelRepository) {
        this.papelRepository = papelRepository;
    }

    /**
     * Return a {@link List} of {@link Papel} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Papel> findByCriteria(PapelCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Papel> specification = createSpecification(criteria);
        return papelRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Papel} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Papel> findByCriteria(PapelCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Papel> specification = createSpecification(criteria);
        return papelRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(PapelCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Papel> specification = createSpecification(criteria);
        return papelRepository.count(specification);
    }

    /**
     * Function to convert {@link PapelCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Papel> createSpecification(PapelCriteria criteria) {
        Specification<Papel> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Papel_.id));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), Papel_.nombre));
            }
        }
        return specification;
    }
}
