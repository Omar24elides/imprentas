package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A CostosIndirectos.
 */
@Entity
@Table(name = "costos_indirectos")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CostosIndirectos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cantidad")
    private Integer cantidad;

    @ManyToOne
    // @JsonIgnoreProperties("costosIndirectos")
    private Libro libro;

    @ManyToOne
    // @JsonIgnoreProperties("costosIndirectos")
    private Extras extra;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public CostosIndirectos cantidad(Integer cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Libro getLibro() {
        return libro;
    }

    public CostosIndirectos libro(Libro libro) {
        this.libro = libro;
        return this;
    }

    public void setLibro(Libro libro) {
        this.libro = libro;
    }

    public Extras getExtra() {
        return extra;
    }

    public CostosIndirectos extra(Extras extra) {
        this.extra = extra;
        return this;
    }

    public void setExtra(Extras extra) {
        this.extra = extra;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CostosIndirectos)) {
            return false;
        }
        return id != null && id.equals(((CostosIndirectos) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CostosIndirectos{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            "}";
    }
}
