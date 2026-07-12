import Container from "../layout/Container";

function FormLayout({ children }) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 py-24">

      <Container>

        <div className="mx-auto max-w-6xl">

          <div className="overflow-hidden rounded-[36px] border border-gray-100 bg-white shadow-2xl">

            <div className="h-2 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-400"></div>

            <div className="p-6 md:p-10 lg:p-14">

              {children}

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}

export default FormLayout;