package com.stage.clientele.auditing;

import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<String> {
    private static final String NOMEN_NESCIO = "N.N.";
    @Override
    public Optional<String> getCurrentAuditor() {
        String actorName = System.getProperty("user.name");
        return actorName != null ? Optional.of(actorName) : Optional.of(NOMEN_NESCIO);
    }
}
