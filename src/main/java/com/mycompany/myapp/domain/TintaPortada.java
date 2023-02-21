package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TintaPortada.
 */
@Entity
@Table(name = "tinta_portada")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TintaPortada implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Tinta tinta;

    @ManyToOne
    private Portada portada;

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

    public TintaPortada tinta(Tinta tinta) {
        this.tinta = tinta;
        return this;
    }

    public void setTinta(Tinta tinta) {
        this.tinta = tinta;
    }

    public Portada getPortada() {
        return portada;
    }

    public TintaPortada portada(Portada portada) {
        this.portada = portada;
        return this;
    }

    public void setPortada(Portada portada) {
        this.portada = portada;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TintaPortada)) {
            return false;
        }
        return id != null && id.equals(((TintaPortada) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TintaPortada{" +
            "id=" + getId() +
            "}";
    }
}
