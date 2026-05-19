import Link from "next/link";

export default async function AdminIndexPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Site Management
          </h2>
          <p className="text-sm text-gray-600">
            Manage pages, media, and
            settings.
          </p>
        </div>
        <div>
          <Link
            href="/admin/pages/new"
            className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500"
          >
            New Page
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link
          href="/admin/pages"
          className="block rounded border bg-white p-4 hover:shadow"
        >
          <h3 className="text-lg font-medium">
            Pages
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Create and edit website
            pages.
          </p>
        </Link>

        <Link
          href="/admin/media"
          className="block rounded border bg-white p-4 hover:shadow"
        >
          <h3 className="text-lg font-medium">
            Media
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Manage images and videos
            used on the site.
          </p>
        </Link>

        <Link
          href="/admin/settings"
          className="block rounded border bg-white p-4 hover:shadow"
        >
          <h3 className="text-lg font-medium">
            Settings
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Site configuration and
            metadata.
          </p>
        </Link>
      </div>
    </div>
  );
}
