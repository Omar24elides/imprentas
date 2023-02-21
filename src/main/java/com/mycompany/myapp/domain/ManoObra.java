package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ManoObra.
 */
@Entity
@Table(name = "mano_obra")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ManoObra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "turno")
    private Integer turno;

    @Column(name = "horas")
    private Integer horas;

    @Column(name = "dias")
    private Integer dias;

    @Column(name = "mes")
    private Integer mes;

    @Column(name = "horas_extra")
    private Integer horasExtra;

    @ManyToOne
    // @JsonIgnoreProperties("manoObras")
    private Libro libro;

    @ManyToOne
    // @JsonIgnoreProperties("manoObras")
    private Maquina maquina;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTurno() {
        return turno;
    }

    public ManoObra turno(Integer turno) {
        this.turno = turno;
        return this;
    }

    public void setTurno(Integer turno) {
        this.turno = turno;
    }

    public Integer getHoras() {
        return horas;
    }

    public ManoObra horas(Integer horas) {
        this.horas = horas;
        return this;
    }

    public void setHoras(Integer horas) {
        this.horas = horas;
    }

    public Integer getDias() {
        return dias;
    }

    public ManoObra dias(Integer dias) {
        this.dias = dias;
        return this;
    }

    public void setDias(Integer dias) {
        this.dias = dias;
    }

    public Integer getMes() {
        return mes;
    }

    public ManoObra mes(Integer mes) {
        this.mes = mes;
        return this;
    }

    public void setMes(Integer mes) {
        this.mes = mes;
    }

    public Integer getHorasExtra() {
        return horasExtra;
    }

    public ManoObra horasExtra(Integer horasExtra) {
        this.horasExtra = horasExtra;
        return this;
    }

    public void setHorasExtra(Integer horasExtra) {
        this.horasExtra = horasExtra;
    }

    public Libro getLibro() {
        return libro;
    }

    public ManoObra libro(Libro libro) {
        this.libro = libro;
        return this;
    }

    public void setLibro(Libro libro) {
        this.libro = libro;
    }

    public Maquina getMaquina() {
        return maquina;
    }

    public ManoObra maquina(Maquina maquina) {
        this.maquina = maquina;
        return this;
    }

    public void setMaquina(Maquina maquina) {
        this.maquina = maquina;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ManoObra)) {
            return false;
        }
        return id != null && id.equals(((ManoObra) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ManoObra{" +
            "id=" + getId() +
            ", turno=" + getTurno() +
            ", horas=" + getHoras() +
            ", dias=" + getDias() +
            ", mes=" + getMes() +
            ", horasExtra=" + getHorasExtra() +
            "}";
    }
}
