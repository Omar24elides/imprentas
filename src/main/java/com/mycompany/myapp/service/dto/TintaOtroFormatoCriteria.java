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
 * Criteria class for the {@link com.mycompany.myapp.domain.TintaOtroFormato} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.TintaOtroFormatoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /tinta-otro-formatoes?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class TintaOtroFormatoCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private LongFilter tintaId;

    private LongFilter otroFormatoId;

    public TintaOtroFormatoCriteria(){
    }

    public TintaOtroFormatoCriteria(TintaOtroFormatoCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.tintaId = other.tintaId == null ? null : other.tintaId.copy();
        this.otroFormatoId = other.otroFormatoId == null ? null : other.otroFormatoId.copy();
    }

    @Override
    public TintaOtroFormatoCriteria copy() {
        return new TintaOtroFormatoCriteria(this);
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

    public LongFilter getOtroFormatoId() {
        return otroFormatoId;
    }

    public void setOtroFormatoId(LongFilter otroFormatoId) {
        this.otroFormatoId = otroFormatoId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final TintaOtroFormatoCriteria that = (TintaOtroFormatoCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(tintaId, that.tintaId) &&
            Objects.equals(otroFormatoId, that.otroFormatoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        tintaId,
        otroFormatoId
        );
    }

    @Override
    public String toString() {
        return "TintaOtroFormatoCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (tintaId != null ? "tintaId=" + tintaId + ", " : "") +
                (otroFormatoId != null ? "otroFormatoId=" + otroFormatoId + ", " : "") +
            "}";
    }

}
