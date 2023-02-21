package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.mycompany.myapp.domain.TintaPortada} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.TintaPortadaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /tinta-portadas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class TintaPortadaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter tintaId;

    private LongFilter portadaId;

    public TintaPortadaCriteria(){
    }

    public TintaPortadaCriteria(TintaPortadaCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.tintaId = other.tintaId == null ? null : other.tintaId.copy();
        this.portadaId = other.portadaId == null ? null : other.portadaId.copy();
    }

    @Override
    public TintaPortadaCriteria copy() {
        return new TintaPortadaCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public LongFilter getTintaId() {
        return tintaId;
    }

    public void setTintaId(LongFilter tintaId) {
        this.tintaId = tintaId;
    }

    public LongFilter getPortadaId() {
        return portadaId;
    }

    public void setPortadaId(LongFilter portadaId) {
        this.portadaId = portadaId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final TintaPortadaCriteria that = (TintaPortadaCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(tintaId, that.tintaId) &&
            Objects.equals(portadaId, that.portadaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        tintaId,
        portadaId
        );
    }

    @Override
    public String toString() {
        return "TintaPortadaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (tintaId != null ? "tintaId=" + tintaId + ", " : "") +
                (portadaId != null ? "portadaId=" + portadaId + ", " : "") +
            "}";
    }

}
