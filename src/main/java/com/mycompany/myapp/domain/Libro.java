package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Libro.
 */
@Entity
@Table(name = "libro")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Libro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cantidad")
    private Integer cantidad;

    @ManyToOne
    // @JsonIgnoreProperties("libros")
    @JoinColumn(name="tripa_a_id")
    private TripaA tripaA;

    @ManyToOne
    // @JsonIgnoreProperties("libros")
    @JoinColumn(name="tripa_b_id")
    private TripaB tripaB;

    @ManyToOne
    // @JsonIgnoreProperties("libros")
    private Portada portada;

    @ManyToOne
    // @JsonIgnoreProperties("libros")
    private OtroFormato otroFormato;

    @ManyToOne
    // @JsonIgnoreProperties("libros")
    private Cliente cliente;

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

    public Libro cantidad(Integer cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public TripaA getTripaA() {
        return tripaA;
    }

    public Libro tripaA(TripaA tripaA) {
        this.tripaA = tripaA;
        return this;
    }

    public void setTripaA(TripaA tripaA) {
        this.tripaA = tripaA;
    }

    public TripaB getTripaB() {
        return tripaB;
    }

    public Libro tripaB(TripaB tripaB) {
        this.tripaB = tripaB;
        return this;
    }

    public void setTripaB(TripaB tripaB) {
        this.tripaB = tripaB;
    }

    public Portada getPortada() {
        return portada;
    }

    public Libro portada(Portada portada) {
        this.portada = portada;
        return this;
    }

    public void setPortada(Portada portada) {
        this.portada = portada;
    }

    public OtroFormato getOtroFormato() {
        return otroFormato;
    }

    public Libro otroFormato(OtroFormato otroFormato) {
        this.otroFormato = otroFormato;
        return this;
    }

    public void setOtroFormato(OtroFormato otroFormato) {
        this.otroFormato = otroFormato;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Libro cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Libro)) {
            return false;
        }
        return id != null && id.equals(((Libro) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Libro{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            "}";
    }
}
