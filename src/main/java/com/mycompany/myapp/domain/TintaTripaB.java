package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TintaTripaB.
 */
@Entity
@Table(name = "tinta_tripa_b")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TintaTripaB implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Tinta tinta;

    @ManyToOne
    @JoinColumn(name="tripa_b_id")
    private TripaB tripaB;

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

    public TintaTripaB tinta(Tinta tinta) {
        this.tinta = tinta;
        return this;
    }

    public void setTinta(Tinta tinta) {
        this.tinta = tinta;
    }

    public TripaB getTripaB() {
        return tripaB;
    }

    public TintaTripaB tripaB(TripaB tripaB) {
        this.tripaB = tripaB;
        return this;
    }

    public void setTripaB(TripaB tripaB) {
        this.tripaB = tripaB;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TintaTripaB)) {
            return false;
        }
        return id != null && id.equals(((TintaTripaB) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TintaTripaB{" +
            "id=" + getId() +
            "}";
    }
}
