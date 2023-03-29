export function formatCpf(cpf: string): string {
  cpf = cpf.replace(/\D/g, '')
  cpf = cpf.padStart(11, '0');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

