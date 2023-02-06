package brunotot.skullking.infrastructure.service.impl;

import lombok.NonNull;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Component
public class AppContextUtils implements ApplicationContextAware {
    private static final String BEAN_NOT_FOUND_MSG_FORMAT = "Bean class %s not found";
    private static final String MULTIPLE_BEAN_IMPLS_FOUND_MSG_FORMAT =
            "Unable to determine bean class %s due to multiple implementations (\"%s\"). " +
                    "For this case use getBean(Class, String) method";

    private static ApplicationContext applicationContext;

    public AppContextUtils() {
    }

    public static <T> T getBean(final Class<T> clazz) {
        Objects.requireNonNull(clazz);
        List<String> beanNamesForType = Arrays.asList(applicationContext.getBeanNamesForType(clazz));
        String classSimpleName = clazz.getSimpleName();
        if (beanNamesForType.isEmpty()) {
            throw new RuntimeException(String.format(BEAN_NOT_FOUND_MSG_FORMAT, classSimpleName));
        } else if (beanNamesForType.size() > 1) {
            var beanDefs = String.join("\", \"", beanNamesForType);
            throw new RuntimeException(String.format(MULTIPLE_BEAN_IMPLS_FOUND_MSG_FORMAT, classSimpleName, beanDefs));
        } else {
            String beanName = beanNamesForType.get(0);
            return getBean(clazz, beanName);
        }
    }

    public static <T> T getBean(final Class<T> clazz, final String beanName) {
        return applicationContext.getBean(beanName, clazz);
    }

    public void setApplicationContext(@NonNull final ApplicationContext applicationContext) {
        AppContextUtils.applicationContext = applicationContext;
    }
}
