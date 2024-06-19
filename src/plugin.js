import plugin from 'tailwindcss/plugin';

export default plugin(
    ({ addVariant }) => {
        addVariant('intersect', '&:not([no-intersect])');
    },
);
