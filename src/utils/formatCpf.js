export function formatCPF(cpf) {
    let newCpf = cpf.substr(0,3)+'.'+cpf.substr(3,3)+'.'+cpf.substr(6,3)+'-'+cpf.substr(9,2);
    return newCpf;
}