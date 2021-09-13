export function formatCPF(cpf: string): string {
    cpf = cpf.replace(/\.|-/g, '');
    const newCpf = cpf.substr(0,3)+'.'+cpf.substr(3,3)+'.'+cpf.substr(6,3)+'-'+cpf.substr(9,2);
    return newCpf;
}