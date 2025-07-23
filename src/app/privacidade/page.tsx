import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-full lg:w-[60%] p-10 rounded-lg">
        <h1 className="text-2xl font-bold mb-3">Privacidade e dados</h1>
        <p>
          Os únicos dados guardados por este site são o nome e URL para fotografia do seu perfil no
          Facebook. Ambos são dados públicos, visíveis para qualquer pessoa que visite o seu perfil.
        </p>

        <p className="mt-4">
          Estes dados são utilizados apenas para exibir os comentários publicados neste site. Não
          são partilhados com terceiros.
        </p>

        <p className="mt-4">
          Este site não guarda nem processa qualquer outro dado pessoal. Não são guardados endereços
          de email, números de telefone, ou qualquer outro tipo de informação pessoal, a que, de
          resto, não temos acesso. Isto pode ser verificado nas permissões da aplicação do Facebook
          que é utilizada para autenticação.
        </p>

        <p className="mt-4">
          Se pretenderes remover os teus dados (nome e URL da fotografia), por favor contacta
          através do email{' '}
          <a
            href="mailto:estrelasemcensura.vendor549@dralias.com"
            className="font-bold hover:underline"
          >
            estrelasemcensura.vendor549@dralias.com
          </a>
          .
        </p>

        <h1 className="text-2xl font-bold mb-3 mt-10">Conteúdo</h1>
        <p className="mt-4">
          Quem gere este site não tem qualquer responsabilidade sobre o conteúdo das publicações —
          que são da autoria da SAD do Estrela da Amadora — ou dos comentários, que são da
          responsabilidade dos utilizadores que os publicam.
        </p>

        <h1 className="text-2xl font-bold mb-3 mt-10">Reclamações</h1>
        <p className="mt-4">Grita-as alto na bancada.</p>
        <Link href="/" className="hover:underline text-sm mt-8 block">
          &lt; Voltar
        </Link>
      </div>
    </div>
  );
}
