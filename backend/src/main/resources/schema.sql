DROP TABLE IF EXISTS public.photo ;
DROP TABLE IF EXISTS public.request_restaurants ;
DROP TABLE IF EXISTS public.restaurant_has_category ;
DROP TABLE IF EXISTS public.review ;
DROP TABLE IF EXISTS public.category ;
DROP TABLE IF EXISTS public."user" ;
DROP TABLE IF EXISTS public.restaurant ;


--
-- TOC entry 225 (class 1259 OID 16443)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE   public.category (
    category_id integer CONSTRAINT categories_categories_id_not_null NOT NULL,
    name character varying(128),
    created_at timestamp(0) without time zone
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16442)
-- Name: categories_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE  public.categories_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_categories_id_seq OWNER TO postgres;

--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 224
-- Name: categories_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_categories_id_seq OWNED BY public.category.category_id;


--
-- TOC entry 227 (class 1259 OID 16451)
-- Name: photo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE  public.photo (
    photo_id integer NOT NULL,
    restaurant_id integer,
    user_id integer,
    url character varying(256),
    registed_flag boolean,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.photo OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16450)
-- Name: photo_photo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE  public.photo_photo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.photo_photo_id_seq OWNER TO postgres;

--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 226
-- Name: photo_photo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.photo_photo_id_seq OWNED BY public.photo.photo_id;


--
-- TOC entry 229 (class 1259 OID 16461)
-- Name: request_restaurants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE  public.request_restaurants (
    request_restaurants_id integer NOT NULL,
    user_id integer,
    name character varying(64),
    url character varying(256),
    created_at timestamp(0) without time zone
);


ALTER TABLE public.request_restaurants OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16460)
-- Name: request_restaurants_request_restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE  public.request_restaurants_request_restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.request_restaurants_request_restaurants_id_seq OWNER TO postgres;

--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 228
-- Name: request_restaurants_request_restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.request_restaurants_request_restaurants_id_seq OWNED BY public.request_restaurants.request_restaurants_id;


--
-- TOC entry 220 (class 1259 OID 16412)
-- Name: restaurant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE  public.restaurant (
    restaurant_id integer NOT NULL,
    name character varying(64),
    address character varying(256),
    distance integer,
    url character varying(256),
    average_budget character varying(64),
    description text,
    image_url character varying(256),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.restaurant OWNER TO postgres;


--
-- TOC entry 230 (class 1259 OID 16470)
-- Name: restaurant_has_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE  public.restaurant_has_category (
    restaurant_id integer CONSTRAINT restaurant_has_categorys_restaurant_id_not_null NOT NULL,
    category_id integer CONSTRAINT restaurant_has_categorys_category_id_not_null NOT NULL
);


ALTER TABLE public.restaurant_has_category OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16482)
-- Name: restaurant_restaurant_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE  public.restaurant_restaurant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.restaurant_restaurant_id_seq OWNER TO postgres;

--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 231
-- Name: restaurant_restaurant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.restaurant_restaurant_id_seq OWNED BY public.restaurant.restaurant_id;


--
-- TOC entry 223 (class 1259 OID 16426)
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE  public.review (
    review_id integer NOT NULL,
    restaurant_id integer NOT NULL,
    user_id integer,
    rating integer,
    comment text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.review OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16425)
-- Name: review_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE  public.review_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.review_review_id_seq OWNER TO postgres;

--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 222
-- Name: review_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.review_review_id_seq OWNED BY public.review.review_id;


--
-- TOC entry 219 (class 1259 OID 16409)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE  public."user" (
    user_id integer CONSTRAINT user_id_not_null NOT NULL,
    name character varying(64) NOT NULL,
    password character varying(1024) NOT NULL,
    introduction text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16415)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE  public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".user_id;


--
-- TOC entry 4888 (class 2604 OID 16446)
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.categories_categories_id_seq'::regclass);


--
-- TOC entry 4889 (class 2604 OID 16454)
-- Name: photo photo_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photo ALTER COLUMN photo_id SET DEFAULT nextval('public.photo_photo_id_seq'::regclass);


--
-- TOC entry 4890 (class 2604 OID 16464)
-- Name: request_restaurants request_restaurants_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_restaurants ALTER COLUMN request_restaurants_id SET DEFAULT nextval('public.request_restaurants_request_restaurants_id_seq'::regclass);


--
-- TOC entry 4886 (class 2604 OID 16483)
-- Name: restaurant restaurant_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant ALTER COLUMN restaurant_id SET DEFAULT nextval('public.restaurant_restaurant_id_seq'::regclass);


--
-- TOC entry 4887 (class 2604 OID 16429)
-- Name: review review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review ALTER COLUMN review_id SET DEFAULT nextval('public.review_review_id_seq'::regclass);


--
-- TOC entry 4885 (class 2604 OID 16416)
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 4898 (class 2606 OID 16449)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- TOC entry 4900 (class 2606 OID 16459)
-- Name: photo photo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photo
    ADD CONSTRAINT photo_pkey PRIMARY KEY (photo_id);


--
-- TOC entry 4902 (class 2606 OID 16469)
-- Name: request_restaurants request_restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_restaurants
    ADD CONSTRAINT request_restaurants_pkey PRIMARY KEY (request_restaurants_id);


--
-- TOC entry 4904 (class 2606 OID 16476)
-- Name: restaurant_has_category restaurant_has_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_has_category
    ADD CONSTRAINT restaurant_has_category_pkey PRIMARY KEY (restaurant_id, category_id);


--
-- TOC entry 4894 (class 2606 OID 16523)
-- Name: restaurant restaurant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT restaurant_pkey PRIMARY KEY (restaurant_id);


--
-- TOC entry 4896 (class 2606 OID 16435)
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (review_id);


--
-- TOC entry 4892 (class 2606 OID 16441)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4907 (class 2606 OID 16539)
-- Name: photo photo_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photo
    ADD CONSTRAINT photo_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurant(restaurant_id) NOT VALID;


--
-- TOC entry 4908 (class 2606 OID 16544)
-- Name: photo photo_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photo
    ADD CONSTRAINT photo_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id) NOT VALID;


--
-- TOC entry 4909 (class 2606 OID 16534)
-- Name: request_restaurants request_restaurants_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_restaurants
    ADD CONSTRAINT request_restaurants_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id) NOT VALID;


--
-- TOC entry 4910 (class 2606 OID 16529)
-- Name: restaurant_has_category restaurant_has_category_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_has_category
    ADD CONSTRAINT restaurant_has_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(category_id) NOT VALID;


--
-- TOC entry 4911 (class 2606 OID 16524)
-- Name: restaurant_has_category restaurant_has_category_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_has_category
    ADD CONSTRAINT restaurant_has_category_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurant(restaurant_id) NOT VALID;


--
-- TOC entry 4905 (class 2606 OID 16549)
-- Name: review review_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurant(restaurant_id) NOT VALID;


--
-- TOC entry 4906 (class 2606 OID 16554)
-- Name: review review_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id) NOT VALID;
