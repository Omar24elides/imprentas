package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TripaB.
 */
@Entity
@Table(name = "tripa_b")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TripaB implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ancho")
    private Double ancho;

    @Column(name = "alto")
    private Double alto;

    @Column(name = "color_t")
    private Integer colorT;

    @Column(name = "color_r")
    private Integer colorR;

    @Column(name = "numero_pag")
    private Integer numeroPag;

    @ManyToOne
    // @JsonIgnoreProperties("tripaBS")
    private Pelicula pelicula;

    @ManyToOne
    // @JsonIgnoreProperties("tripaBS")
    private Plancha plancha;

    @ManyToOne
    // @JsonIgnoreProperties("tripaBS")
    private TipoMontaje tipoMontaje;

    @ManyToOne
    // @JsonIgnoreProperties("tripaBS")
    private Maquina maquina;

    @ManyToOne
    // @JsonIgnoreProperties("tripaBS")
    private TipoPapel tipoPapel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAncho() {
        return ancho;
    }

    public TripaB ancho(Double ancho) {
        this.ancho = ancho;
        return this;
    }

    public void setAncho(Double ancho) {
        this.ancho = ancho;
    }

    public Double getAlto() {
        return alto;
    }

    public TripaB alto(Double alto) {
        this.alto = alto;
        return this;
    }

    public void setAlto(Double alto) {
        this.alto = alto;
    }

    public Integer getColorT() {
        return colorT;
    }

    public TripaB colorT(Integer colorT) {
        this.colorT = colorT;
        return this;
    }

    public void setColorT(Integer colorT) {
        this.colorT = colorT;
    }

    public Integer getColorR() {
        return colorR;
    }

    public TripaB colorR(Integer colorR) {
        this.colorR = colorR;
        return this;
    }

    public void setColorR(Integer colorR) {
        this.colorR = colorR;
    }

    public Integer getNumeroPag() {
        return numeroPag;
    }

    public TripaB numeroPag(Integer numeroPag) {
        this.numeroPag = numeroPag;
        return this;
    }

    public void setNumeroPag(Integer numeroPag) {
        this.numeroPag = numeroPag;
    }

    public Pelicula getPelicula() {
        return pelicula;
    }

    public TripaB pelicula(Pelicula pelicula) {
        this.pelicula = pelicula;
        return this;
    }

    public void setPelicula(Pelicula pelicula) {
        this.pelicula = pelicula;
    }

    public Plancha getPlancha() {
        return plancha;
    }

    public TripaB plancha(Plancha plancha) {
        this.plancha = plancha;
        return this;
    }

    public void setPlancha(Plancha plancha) {
        this.plancha = plancha;
    }

    public TipoMontaje getTipoMontaje() {
        return tipoMontaje;
    }

    public TripaB tipoMontaje(TipoMontaje tipoMontaje) {
        this.tipoMontaje = tipoMontaje;
        return this;
    }

    public void setTipoMontaje(TipoMontaje tipoMontaje) {
        this.tipoMontaje = tipoMontaje;
    }

    public Maquina getMaquina() {
        return maquina;
    }

    public TripaB maquina(Maquina maquina) {
        this.maquina = maquina;
        return this;
    }

    public void setMaquina(Maquina maquina) {
        this.maquina = maquina;
    }

    public TipoPapel getTipoPapel() {
        return tipoPapel;
    }

    public TripaB tipoPapel(TipoPapel tipoPapel) {
        this.tipoPapel = tipoPapel;
        return this;
    }

    public void setTipoPapel(TipoPapel tipoPapel) {
        this.tipoPapel = tipoPapel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TripaB)) {
            return false;
        }
        return id != null && id.equals(((TripaB) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TripaB{" +
            "id=" + getId() +
            ", ancho=" + getAncho() +
            ", alto=" + getAlto() +
            ", colorT=" + getColorT() +
            ", colorR=" + getColorR() +
            ", numeroPag=" + getNumeroPag() +
            "}";
    }
}
