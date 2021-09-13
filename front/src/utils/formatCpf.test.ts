import { formatCPF } from "./formatCpf";

test('formatação de cpf', () => {
    expect(formatCPF('07030393937')).toBe('070.303.939-37');
    expect(formatCPF('070.303.939-37')).toBe('070.303.939-37');
    expect(formatCPF('070.303.93937')).toBe('070.303.939-37'); 
    expect(formatCPF('070303.939-37')).toBe('070.303.939-37');
    expect(formatCPF('070303939-37')).toBe('070.303.939-37');
})

