import React from 'react'
import { Modal, Button } from 'antd'
import Link from 'next/link'

const DisclaimerModal = ({ visible, onAccept }) => {
  return (
    <Modal
      title="Descargo de responsabilidades"
      visible={visible}
      footer={[
        <Link href="/" passHref key="reject">
          <Button>Rechazar</Button>
        </Link>,
        <Button key="accept" type="primary" onClick={onAccept}>
          Aceptar
        </Button>,
      ]}
      closable={false}
    >
      <p>Lea el siguiente aviso antes de continuar.</p>
      <p>
        Publicando el botón de "aceptar" declaras bajo tu responsabilidad ser
        mayor de edad para acceder a contenidos para adultos.
      </p>
      <p>
        No se permite publicar anuncios que se refieran a servicios sexuales.
      </p>
      <p>
        No se permite subir imágenes que contengan material pornográfico,
        desnudez o todo lo que pueda ofender la decencia y la moralidad.
      </p>
      <p>
        Cualquier usuario que publique anuncios que contengan material
        pedopornográfico será informado a las autoridades competentes y será
        baneado y prohibido para siempre del sitio.
      </p>
      <p>
        Al hacer clic en aceptar, el usuario libera a SIMPLEESCORTS de la
        responsabilidad sobre el contenido publicado y declara ser consciente de
        que el sitio solo actúa como un proveedor de servicios sin un control de
        moderación previa sobre el contenido.
      </p>
      <p>
        Al colocar un anuncio en SIMPLEESCORTS, el usuario certifica que tiene
        todos los derechos sobre el contenido publicado, y también declara que
        todas las imágenes subidas representan a personas mayores de edad
        (mayores de 18 años) y que se le ha dado su consentimiento al
        publicarlos en el Sitio.
      </p>
    </Modal>
  )
}

export default DisclaimerModal
