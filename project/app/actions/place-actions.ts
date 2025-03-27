"use server"

import { revalidatePath } from "next/cache"
import { executeQuery } from "@/lib/db"
import { auth } from "@/auth"
import { v4 as uuidv4 } from "uuid"
import { logUserActivity } from "@/lib/activity-logger"

export async function getPlaces(page = 1, limit = 10, search = "", type = "") {
  try {
    const offset = (page - 1) * limit

    let query = `
      SELECT p.*, u.name as added_by_name
      FROM religious_places p
      LEFT JOIN users u ON p.added_by = u.id
      WHERE 1=1
    `

    const params = []
    let paramIndex = 1

    if (search) {
      query += ` AND (p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex} OR p.location ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    if (type) {
      query += ` AND p.type = $${paramIndex}`
      params.push(type)
      paramIndex++
    }

    query += ` ORDER BY p.created_at DESC LIMIT ${limit} OFFSET ${offset}`

    const { success, data, error } = await executeQuery(query, params)

    if (!success) {
      throw error
    }

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM religious_places p
      WHERE 1=1
    `

    const countParams = []
    paramIndex = 1

    if (search) {
      countQuery += ` AND (p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex} OR p.location ILIKE $${paramIndex})`
      countParams.push(`%${search}%`)
      paramIndex++
    }

    if (type) {
      countQuery += ` AND p.type = $${paramIndex}`
      countParams.push(type)
      paramIndex++
    }

    const { data: countData } = await executeQuery(countQuery, countParams)
    const total = Number.parseInt(countData[0].total)

    return {
      success: true,
      places: data,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    }
  } catch (error) {
    console.error("Error fetching places:", error)
    return {
      success: false,
      message: "Failed to fetch places",
      places: [],
      pagination: {
        total: 0,
        pages: 0,
        page,
        limit,
      },
    }
  }
}

export async function getPlaceById(id: string) {
  try {
    const { data, success, error } = await executeQuery(
      `
      SELECT p.*, u.name as added_by_name
      FROM religious_places p
      LEFT JOIN users u ON p.added_by = u.id
      WHERE p.id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    if (!data.length) {
      return {
        success: false,
        message: "Place not found",
        place: null,
      }
    }

    // Get images
    const { data: images } = await executeQuery(
      `
      SELECT * FROM place_images
      WHERE place_id = $1
      ORDER BY created_at ASC
    `,
      [id],
    )

    // Log activity
    const session = await auth()
    if (session?.user) {
      await logUserActivity("place_viewed", "place", id)
    }

    return {
      success: true,
      place: {
        ...data[0],
        images: images || [],
      },
    }
  } catch (error) {
    console.error("Error fetching place:", error)
    return {
      success: false,
      message: "Failed to fetch place",
      place: null,
    }
  }
}

export async function createPlace(formData: FormData) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    const id = uuidv4()
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const type = formData.get("type") as string
    const location = formData.get("location") as string
    const latitude = Number.parseFloat(formData.get("latitude") as string) || null
    const longitude = Number.parseFloat(formData.get("longitude") as string) || null
    const visitingHours = formData.get("visitingHours") as string
    const contactInfo = formData.get("contactInfo") as string
    const website = formData.get("website") as string
    const featuredImage = formData.get("featuredImage") as string

    if (!name || !location) {
      return {
        success: false,
        message: "Name and location are required",
      }
    }

    const { success, error } = await executeQuery(
      `
      INSERT INTO religious_places (
        id, name, description, type, location, latitude, longitude,
        visiting_hours, contact_info, website, featured_image, added_by
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `,
      [
        id,
        name,
        description || null,
        type || null,
        location,
        latitude,
        longitude,
        visitingHours || null,
        contactInfo || null,
        website || null,
        featuredImage || null,
        session.user.id,
      ],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("place_created", "place", id)

    revalidatePath("/admin/places")
    revalidatePath("/places")

    return {
      success: true,
      message: "Place created successfully",
      placeId: id,
    }
  } catch (error) {
    console.error("Error creating place:", error)
    return {
      success: false,
      message: "Failed to create place",
    }
  }
}

export async function updatePlace(id: string, formData: FormData) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const type = formData.get("type") as string
    const location = formData.get("location") as string
    const latitude = Number.parseFloat(formData.get("latitude") as string) || null
    const longitude = Number.parseFloat(formData.get("longitude") as string) || null
    const visitingHours = formData.get("visitingHours") as string
    const contactInfo = formData.get("contactInfo") as string
    const website = formData.get("website") as string
    const featuredImage = formData.get("featuredImage") as string

    if (!name || !location) {
      return {
        success: false,
        message: "Name and location are required",
      }
    }

    const { success, error } = await executeQuery(
      `
      UPDATE religious_places
      SET 
        name = $1,
        description = $2,
        type = $3,
        location = $4,
        latitude = $5,
        longitude = $6,
        visiting_hours = $7,
        contact_info = $8,
        website = $9,
        featured_image = $10,
        updated_at = NOW()
      WHERE id = $11
    `,
      [
        name,
        description || null,
        type || null,
        location,
        latitude,
        longitude,
        visitingHours || null,
        contactInfo || null,
        website || null,
        featuredImage || null,
        id,
      ],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("place_updated", "place", id)

    revalidatePath(`/admin/places/${id}`)
    revalidatePath(`/places/${id}`)
    revalidatePath("/admin/places")
    revalidatePath("/places")

    return {
      success: true,
      message: "Place updated successfully",
    }
  } catch (error) {
    console.error("Error updating place:", error)
    return {
      success: false,
      message: "Failed to update place",
    }
  }
}

export async function deletePlace(id: string) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    // First delete all images
    await executeQuery(
      `
      DELETE FROM place_images
      WHERE place_id = $1
    `,
      [id],
    )

    // Then delete the place
    const { success, error } = await executeQuery(
      `
      DELETE FROM religious_places
      WHERE id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("place_deleted", "place", id)

    revalidatePath("/admin/places")
    revalidatePath("/places")

    return {
      success: true,
      message: "Place deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting place:", error)
    return {
      success: false,
      message: "Failed to delete place",
    }
  }
}

export async function addPlaceImage(placeId: string, formData: FormData) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    const id = uuidv4()
    const imageUrl = formData.get("imageUrl") as string
    const caption = formData.get("caption") as string

    if (!imageUrl) {
      return {
        success: false,
        message: "Image URL is required",
      }
    }

    // Check if place exists
    const { data: placeData } = await executeQuery(
      `
      SELECT id FROM religious_places WHERE id = $1
    `,
      [placeId],
    )

    if (!placeData.length) {
      return {
        success: false,
        message: "Place not found",
      }
    }

    const { success, error } = await executeQuery(
      `
      INSERT INTO place_images (
        id, place_id, image_url, caption
      )
      VALUES ($1, $2, $3, $4)
    `,
      [id, placeId, imageUrl, caption || null],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("place_image_added", "place", placeId)

    revalidatePath(`/admin/places/${placeId}`)
    revalidatePath(`/places/${placeId}`)

    return {
      success: true,
      message: "Image added successfully",
      imageId: id,
    }
  } catch (error) {
    console.error("Error adding place image:", error)
    return {
      success: false,
      message: "Failed to add image",
    }
  }
}

export async function deletePlaceImage(id: string) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    // Get place ID for revalidation
    const { data: imageData } = await executeQuery(
      `
      SELECT place_id FROM place_images WHERE id = $1
    `,
      [id],
    )

    if (!imageData.length) {
      return {
        success: false,
        message: "Image not found",
      }
    }

    const placeId = imageData[0].place_id

    const { success, error } = await executeQuery(
      `
      DELETE FROM place_images
      WHERE id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("place_image_deleted", "place", placeId)

    revalidatePath(`/admin/places/${placeId}`)
    revalidatePath(`/places/${placeId}`)

    return {
      success: true,
      message: "Image deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting place image:", error)
    return {
      success: false,
      message: "Failed to delete image",
    }
  }
}

