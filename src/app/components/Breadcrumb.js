export default function Breadcrumb({ items }) {
  const baseUrl = "https://nursingstudyvault.online";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="text-sm mb-6" style={{ color: "#9A9FAD" }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={i}>
              {isLast ? (
                <span style={{ color: "#6B6F80" }}>{item.label}</span>
              ) : (
                <a href={item.href} style={{ color: "#9A9FAD" }}>{item.label}</a>
              )}
              {!isLast && " / "}
            </span>
          );
        })}
      </div>
    </>
  );
}
