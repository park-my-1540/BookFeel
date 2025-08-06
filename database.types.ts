export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      category: {
        Row: {
          category_id: number
          keyword: string
        }
        Insert: {
          category_id?: never
          keyword: string
        }
        Update: {
          category_id?: never
          keyword?: string
        }
        Relationships: []
      }
      gemini_ideas: {
        Row: {
          author: string
          cover: string
          created_at: string
          gemini_idea_id: number
          keyword: string
          title: string
        }
        Insert: {
          author: string
          cover: string
          created_at?: string
          gemini_idea_id?: never
          keyword: string
          title: string
        }
        Update: {
          author?: string
          cover?: string
          created_at?: string
          gemini_idea_id?: never
          keyword?: string
          title?: string
        }
        Relationships: []
      }
      playlists: {
        Row: {
          author: string
          created_at: string
          playlist_id: number
          profile_id: string | null
          reason: string | null
          title: string
          upvotes: number | null
          url: string
        }
        Insert: {
          author: string
          created_at?: string
          playlist_id?: never
          profile_id?: string | null
          reason?: string | null
          title: string
          upvotes?: number | null
          url: string
        }
        Update: {
          author?: string
          created_at?: string
          playlist_id?: never
          profile_id?: string | null
          reason?: string | null
          title?: string
          upvotes?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlists_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          bio: string | null
          created_at: string
          name: string
          profile_id: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          name: string
          profile_id: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          name?: string
          profile_id?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      upvotes: {
        Row: {
          playlist_id: number
          profile_id: string
        }
        Insert: {
          playlist_id: number
          profile_id: string
        }
        Update: {
          playlist_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "upvotes_playlist_id_playlists_playlist_id_fk"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlist_list_view"
            referencedColumns: ["playlist_id"]
          },
          {
            foreignKeyName: "upvotes_playlist_id_playlists_playlist_id_fk"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlists"
            referencedColumns: ["playlist_id"]
          },
          {
            foreignKeyName: "upvotes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      user_custom_keywords: {
        Row: {
          author: string
          cover: string
          created_at: string
          gemini_idea_id: number
          keyword: string
          title: string
        }
        Insert: {
          author: string
          cover: string
          created_at?: string
          gemini_idea_id?: never
          keyword: string
          title: string
        }
        Update: {
          author?: string
          cover?: string
          created_at?: string
          gemini_idea_id?: never
          keyword?: string
          title?: string
        }
        Relationships: []
      }
      user_gemini_usage: {
        Row: {
          last_used_at: string
          profile_id: string
          used_count: number | null
        }
        Insert: {
          last_used_at?: string
          profile_id: string
          used_count?: number | null
        }
        Update: {
          last_used_at?: string
          profile_id?: string
          used_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_gemini_usage_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
    }
    Views: {
      all_gemini_ideas: {
        Row: {
          author: string | null
          cover: string | null
          created_at: string | null
          keyword: string | null
          title: string | null
        }
        Relationships: []
      }
      playlist_list_view: {
        Row: {
          author: string | null
          created_at: string | null
          is_upvoted: boolean | null
          playlist_id: number | null
          profile_id: string | null
          title: string | null
          upvotes: number | null
          url: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          is_upvoted?: never
          playlist_id?: number | null
          profile_id?: string | null
          title?: string | null
          upvotes?: number | null
          url?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          is_upvoted?: never
          playlist_id?: number | null
          profile_id?: string | null
          title?: string | null
          upvotes?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "playlists_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
