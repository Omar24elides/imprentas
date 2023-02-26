package com.mycompany.myapp.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.mycompany.myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.mycompany.myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.mycompany.myapp.domain.User.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Authority.class.getName());
            createCache(cm, com.mycompany.myapp.domain.User.class.getName() + ".authorities");
            createCache(cm, com.mycompany.myapp.domain.TipoDocumento.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Cliente.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Libro.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Tinta.class.getName());
            createCache(cm, com.mycompany.myapp.domain.TipoPapel.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Maquina.class.getName());
            createCache(cm, com.mycompany.myapp.domain.TipoMontaje.class.getName());
            createCache(cm, com.mycompany.myapp.domain.TripaA.class.getName());
            createCache(cm, com.mycompany.myapp.domain.TripaB.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Portada.class.getName());
            createCache(cm, com.mycompany.myapp.domain.OtroFormato.class.getName());
            createCache(cm, com.mycompany.myapp.domain.ManoObra.class.getName());
            createCache(cm, com.mycompany.myapp.domain.CostosIndirectos.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Extras.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Plancha.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Pelicula.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Papel.class.getName());
            createCache(cm, com.mycompany.myapp.domain.TintaOtroFormato.class.getName());
            createCache(cm, com.mycompany.myapp.domain.TintaPortada.class.getName());
            createCache(cm, com.mycompany.myapp.domain.TintaTripaA.class.getName());
            createCache(cm, com.mycompany.myapp.domain.TintaTripaB.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }

}
