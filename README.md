# 📊 Análisis de Diferencias: Código Fuente vs Base de Datos de Producción

> **Proyecto:** GrupoSomos EPM — Módulo `theme_somos` (Odoo 16)
> **Fecha de análisis:** Marzo 2026
> **Realizado por:** Jeferson Hernandez

---

## 📌 Contexto

El proyecto `theme_somos` inició con desarrollo desde código fuente en este repositorio (`custom/theme_somos`). A mitad del proyecto, el desarrollo continuó **directamente desde la plataforma Odoo** (editor visual sobre la base de datos de producción), generando una **brecha significativa** entre el código fuente y el estado real del sistema en producción.

Este documento resume el análisis técnico exhaustivo realizado para identificar todas las diferencias entre ambos estados, apoyar la toma de decisiones y definir un plan de sincronización.

---

## 🔍 ¿Qué se comparó?

| Fuente | Ruta | Descripción |
|--------|------|-------------|
| **Código Fuente** | `custom/theme_somos/` | Módulo Odoo con vistas, modelos, controladores y assets. Punto de partida del proyecto. |
| **Base de Datos** | `export_views/theme_somos/` | Export de las vistas XML almacenadas en producción. Refleja el estado actual real del sistema. |

---

## 📈 Indicadores Clave

| Indicador | Valor |
|-----------|-------|
| Archivos XML en código fuente (`portal_somos_theme_somos`) | **64** |
| Archivos XML en base de datos (`export_views/theme_somos`) | **40** |
| Total de módulos en base de datos de producción | **787** |
| Total de módulos en `export_views/` | **20** |
| Páginas con equivalente en ambos lados | **23** |
| Páginas **nuevas solo en BD** (sin respaldo en código) | **14** 🚨 |
| Archivos solo en código (sin equivalente en BD) | **30** |

---

## ⚠️ Hallazgos Principales

### 1. Páginas renombradas y modificadas (23 archivos)

Al pasar el desarrollo a la plataforma Odoo, las páginas fueron renombradas añadiendo el prefijo `page_` o `somos_`. Los archivos existen en ambos lados pero con contenido divergente.

Ejemplos representativos:

| Archivo en Código | Equivalente en BD | Diferencia |
|-------------------|-------------------|------------|
| `transacciones.xml` | `page_transacciones.xml` | +302 líneas en código |
| `update_user.xml` | `page_update_user.xml` | +258 líneas en código |
| `signup.xml` | `somos_signup.xml` | +213 líneas en código |
| `home_somos.xml` | `page_home.xml` | +101 líneas en código |
| `404.xml` | `404.xml` | +10 líneas en BD |

> En **22 de 23 casos**, el código fuente tiene más líneas que la BD. La excepción es `404.xml`, donde la BD tiene más contenido.

---

### 2. Páginas y componentes nuevos solo en BD 🚨

Estos archivos **no existen en el código fuente** y representan funcionalidades implementadas directamente desde Odoo sin respaldo en el repositorio.

| Archivo | Descripción | Prioridad |
|---------|-------------|-----------|
| `header.xml` | Navbar completo con accesibilidad y spinner | 🔴 Alta |
| `footer.xml` | Pie de página con info de contacto | 🔴 Alta |
| `page_canal_transparencia.xml` | Canal de transparencia y denuncias | 🔴 Alta |
| `page_gestion_cobranza.xml` | Sección gestión de cobranza | 🔴 Alta |
| `page_campain_update_user.xml` | Campaña actualización de datos (standalone) | 🔴 Alta |
| `page_requirement-pqrs_wolkvox.xml` | PQRS con integración Wolkvox | 🔴 Alta |
| `wolkvox_script_addition.xml` | Widget de chat Wolkvox (global en `<head>`) | 🔴 Alta |
| `somos_rightBar.xml` | Sidebar flotante de acceso rápido | 🟡 Media |
| `page_vacancies.xml` | Vacantes / Trabaja con nosotros | 🟡 Media |
| `page_data_processing_policy.xml` | Política de tratamiento de datos | 🟡 Media |
| `login_successful_2.xml` | Login exitoso v2 | 🟡 Media |
| `modify_login_clear_session.xml` | Cierre de sesión / limpieza | 🟡 Media |
| `btn_signup.xml` | Botón de registro reutilizable | 🟢 Baja |
| `template_header_opt.xml` | Opciones adicionales del header | 🟢 Baja |

---

### 3. Archivos solo en código fuente (30 archivos)

Existen en el módulo pero **no tienen equivalente directo en BD**. La mayoría son vistas de backend/admin que no se reflejan en el export de producción.

**Categorías identificadas:**

- **Vistas backend/admin** (banners, puntos, preguntas, categorías, usuarios, series, eventos) — 18 archivos
- **Integraciones** (Bitrix CRM, OTP) — 3 archivos
- **Campañas estacionales** (Navidad) — 2 archivos
- **Funcionalidades reemplazadas en BD** (`complaints_channel.xml` → `page_canal_transparencia.xml`) — 2 archivos
- **Obsoletos o pendientes** (`allies.xml`, `ayuda.xml`, `offer.xml`) — 3 archivos
- **Configuración** (`presets.xml`, `base_config_view.xml`) — 2 archivos

---

### 4. Diferencias técnicas estructurales

| Aspecto | Código Fuente | Base de Datos |
|---------|---------------|---------------|
| Modelo de record | `model="website.page"` | `model="ir.ui.view"` |
| Registro de página | Incluye `url`, `is_published`, `key` | Solo el `arch` del view |
| Header/Footer | Embebido en `t-call="website.layout"` | Componentes independientes con XPath |
| Sidebar PQR's | Embebido en `home_somos.xml` | Componente independiente `somos_rightBar.xml` |
| Chat Wolkvox | ❌ No existe | ✅ Script global en `wolkvox_script_addition.xml` |
| Formato XML | Indentación limpia, 4 espacios | Formato comprimido exportado por Odoo |

---

## 🗂️ Módulos en Base de Datos de Producción

El export de producción cubre **20 módulos distintos** (787 archivos XML total). Los más relevantes:

| Módulo | Archivos XML | ¿En código fuente? |
|--------|-------------|--------------------|
| `sin_modulo` (vistas core Odoo) | 440 | ❌ No |
| `website` | 188 | ❌ No |
| `theme_somos` | 40 | ✅ Parcialmente |
| `web` | 33 | ❌ No |
| `portal` | 26 | ⚠️ Parcialmente |
| `restrict_logins` | 1 | ✅ Sí |
| `website_google_tag` | 1 | ✅ Sí |

---

## 🚨 Riesgos Identificados

| Riesgo | Nivel |
|--------|-------|
| El código fuente está desactualizado respecto a producción | 🔴 Crítico |
| Un deploy desde código sobreescribiría cambios de producción | 🔴 Crítico |
| Los 14 archivos nuevos de BD no tienen backup en código | 🔴 Crítico |
| Inconsistencia de naming dificulta la sincronización | 🟡 Medio |
| La integración Wolkvox (chat + PQRS) solo está en BD | 🟡 Medio |

---

## ✅ Plan de Acción Recomendado

Si se desea realizar la migración a código fuente, se propone el siguiente orden:

1. 🔴 **Incorporar los 14 archivos nuevos de BD** al código fuente (`header.xml`, `footer.xml`, `wolkvox_script_addition.xml`, `page_canal_transparencia.xml`, entre otros).
2. 🔴 **Actualizar los 23 archivos renombrados** para alinear la convención de nombres (`page_` prefix).
3. 🔴 **Incorporar los ~20 módulos adicionales** necesarios para completar la funcionalidad del sistema.
4. 🟡 **Revisar los 30 archivos solo en código** y clasificarlos: eliminar obsoletos, mantener backend, actualizar divergentes.
5. 🟡 **Sincronizar contenido** de las 23 páginas con equivalente en ambos lados (comparación línea a línea).
6. 🟢 **Establecer flujo GitOps**: código → review → deploy. Nunca editar directamente desde la plataforma Odoo.

---

## 📁 Estructura del Repositorio

```
custom/
├── theme_somos/               ← Módulo principal (código fuente)
│   ├── __manifest__.py
│   ├── controllers/
│   ├── models/
│   ├── views/
│   │   └── pages/             ← 55 páginas XML
│   ├── data/
│   ├── security/
│   └── static/                ← CSS, JS, imágenes, fuentes, videos
│
└── portal_somos_theme_addons/ ← Módulos addon (restrict_logins, website_google_tag, etc.)

export_views/
└── theme_somos/               ← Export de vistas XML desde BD de producción (40 archivos)
```

---

## 📄 Documentación Completa

El análisis técnico detallado con gráficas comparativas, tablas completas y recomendaciones está disponible en:

```
docs/analisis_diferencias_theme_somos.html
```

---

*Análisis realizado para OnCredit — GrupoSomos EPM · Marzo 2026*
