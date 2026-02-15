import AuthLayout from "@/components/AuthLayout"
import ContactSearch from "@/components/ContactSearch"
import { getContacts } from "@/actions/contacts"

export default async function ContactsPage() {
  const result = await getContacts()
  const contacts = result.success ? result.data : []

  return (
    <AuthLayout>
      <ContactSearch initialContacts={contacts} />
    </AuthLayout>
  )
}
