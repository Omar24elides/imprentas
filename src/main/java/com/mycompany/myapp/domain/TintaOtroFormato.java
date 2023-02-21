package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TintaOtroFormato.
 */
@Entity
@Table(name = "tinta_otro_formato")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TintaOtroFormato implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Tinta tinta;

    @ManyToOne
    private OtroFormato otroFormato;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tinta getTinta() {
        return tinta;
    }

    public TintaOtroFormato tinta(Tinta tinta) {
        this.tinta = tinta;
        return this;
    }

    public void setTinta(Tinta tinta) {
        this.tinta = tinta;
    }

    public OtroFormato getOtroFormato() {
        return otroFormato;
    }

    public TintaOtroFormato otroFormato(OtroFormato otroFormato) {
        this.otroFormato = otroFormato;
        return this;
    }

    public void setOtroFormato(OtroFormato otroFormato) {
        this.otroFormato = otroFormato;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TintaOtroFormato)) {
            return false;
        }
        return id != null && id.equals(((TintaOtroFormato) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TintaOtroFormato{" +
            "id=" + getId() +
            "}";
    }
}
