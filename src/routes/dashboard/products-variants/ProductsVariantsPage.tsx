import { useState } from 'react';

interface ProductVariant {
  id: number;
  productName: string;
  variantName: string;
  color: string;
  size?: string;
  sku: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
}

const mockVariants: ProductVariant[] = [
  { id: 1, productName: 'Rose Gold Lipstick', variantName: 'Classic Rose', color: '#D4AF37', sku: 'RGL-CR-001', price: 24.99, stock: 15, status: 'active' },
  { id: 2, productName: 'Rose Gold Lipstick', variantName: 'Deep Rose', color: '#B22222', sku: 'RGL-DR-002', price: 24.99, stock: 8, status: 'active' },
  { id: 3, productName: 'Matte Foundation', variantName: 'Light', color: '#F5DEB3', size: '30ml', sku: 'MF-L-001', price: 32.99, stock: 12, status: 'active' },
  { id: 4, productName: 'Matte Foundation', variantName: 'Medium', color: '#DEB887', size: '30ml', sku: 'MF-M-002', price: 32.99, stock: 6, status: 'active' },
  { id: 5, productName: 'Matte Foundation', variantName: 'Dark', color: '#8B4513', size: '30ml', sku: 'MF-D-003', price: 32.99, stock: 0, status: 'inactive' },
  { id: 6, productName: 'Eyeshadow Palette', variantName: 'Sunset Colors', color: '#FF6347', sku: 'EP-SC-001', price: 45.99, stock: 4, status: 'active' },
];

export default function ProductsVariants() {
  const [variants] = useState<ProductVariant[]>(mockVariants);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProduct, setFilterProduct] = useState('');

  const uniqueProducts = Array.from(new Set(variants.map(v => v.productName)));

  const filteredVariants = variants.filter(variant => {
    const matchesSearch = variant.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         variant.variantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         variant.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterProduct === '' || variant.productName === filterProduct;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Product Variants Management</h2>
        <button style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Add New Variant
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search variants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            maxWidth: '400px',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
        <select
          value={filterProduct}
          onChange={(e) => setFilterProduct(e.target.value)}
          style={{
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
            minWidth: '200px'
          }}
        >
          <option value="">All Products</option>
          {uniqueProducts.map(product => (
            <option key={product} value={product}>{product}</option>
          ))}
        </select>
      </div>

      {/* Variants Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Product</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Variant</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Color</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Size</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>SKU</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Price</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Stock</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVariants.map((variant) => (
              <tr key={variant.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '1rem' }}>{variant.productName}</td>
                <td style={{ padding: '1rem' }}>{variant.variantName}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: variant.color,
                      borderRadius: '50%',
                      border: '1px solid #ddd'
                    }}></div>
                    {variant.color}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>{variant.size || '-'}</td>
                <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{variant.sku}</td>
                <td style={{ padding: '1rem' }}>${variant.price}</td>
                <td style={{ 
                  padding: '1rem',
                  color: variant.stock < 10 ? '#dc3545' : '#333'
                }}>
                  {variant.stock}
                  {variant.stock < 10 && variant.stock > 0 && ' (Low)'}
                  {variant.stock === 0 && ' (Out)'}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    backgroundColor: variant.status === 'active' ? '#d4edda' : '#f8d7da',
                    color: variant.status === 'active' ? '#155724' : '#721c24'
                  }}>
                    {variant.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#ffc107',
                      color: 'black',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}>
                      Edit
                    </button>
                    <button style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredVariants.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            No variants found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}